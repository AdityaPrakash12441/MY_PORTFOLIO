interface RateLimitRecord {
  timestamps: number[];
}

const ipRecords = new Map<string, RateLimitRecord>();

// Periodically clean up entries older than 24 hours
if (typeof setInterval !== "undefined") {
  const cleanup = setInterval(() => {
    const now = Date.now();
    const dayAgo = now - 24 * 60 * 60 * 1000;
    for (const [ip, record] of ipRecords.entries()) {
      record.timestamps = record.timestamps.filter((t) => t > dayAgo);
      if (record.timestamps.length === 0) {
        ipRecords.delete(ip);
      }
    }
  }, 30 * 60 * 1000);

  // Allow Node.js process to exit cleanly if needed
  if (cleanup && typeof cleanup.unref === "function") {
    cleanup.unref();
  }
}

export function checkRateLimit(
  ip: string,
  options: { maxPerMinute?: number; maxPerDay?: number } = {}
): { allowed: boolean; message?: string } {
  const { maxPerMinute = 6, maxPerDay = 25 } = options;
  const now = Date.now();
  const minuteAgo = now - 60 * 1000;
  const dayAgo = now - 24 * 60 * 60 * 1000;

  let record = ipRecords.get(ip);
  if (!record) {
    record = { timestamps: [] };
    ipRecords.set(ip, record);
  }

  record.timestamps = record.timestamps.filter((t) => t > dayAgo);

  const pastMinuteCount = record.timestamps.filter((t) => t > minuteAgo).length;
  if (pastMinuteCount >= maxPerMinute) {
    return {
      allowed: false,
      message: "You're chatting a bit fast! Please wait a few moments before sending another message.",
    };
  }

  if (record.timestamps.length >= maxPerDay) {
    return {
      allowed: false,
      message: "Daily message limit reached! Feel free to connect directly with Aditya via email at ap2230749@gmail.com or on LinkedIn.",
    };
  }

  record.timestamps.push(now);
  return { allowed: true };
}
