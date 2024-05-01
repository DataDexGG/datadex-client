"use client";

export function getPercentage(current, max, maxPercentage, minPercentage) {
  const a = parseFloat(current);
  const b = parseFloat(max);
  let i = Math.floor(a * 100 / b);
  if (i > maxPercentage) i = maxPercentage;
  if (i < minPercentage) i = minPercentage;
  return i;
}

export function toCountdownDisplay(millis) {
  if (millis <= 0) return "00:00:00";

  const seconds = Math.max(0, Math.floor((millis / 1000) % 60));
  const minutes = Math.max(0, Math.floor((millis / 1000 / 60) % 60));
  const hours = Math.max(0, Math.floor((millis  / 1000 / 3600 ) % 24));

  return [
    pad(hours.toString(), 2),
    pad(minutes.toString(), 2),
    pad(seconds.toString(), 2),
  ].join(':');
}

export function toCountdownDisplayDescriptive(millis) {
  if (millis <= 0) return "1s";

  // const seconds = Math.max(0, Math.floor((millis / 1000) % 60));
  const minutes = Math.max(0, Math.floor((millis / 1000 / 60) % 60));
  const hours = Math.max(0, Math.floor((millis / 1000 / 3600) % 24));
  const days = Math.max(0, Math.floor(millis / 1000 / 3600 / 24));

  let result = "";

  if (days > 0) {
    result += `${days}d`;
    if (hours > 0) {
      result += `, ${hours}h`;
    }
    return result;
  }

  if (hours > 0) {
    result += `${hours}h`;
    if (minutes > 0) {
      result += `, ${minutes}m`;
    }
    return result;
  }

  if (minutes > 0) {
    result += `${minutes}m`;
    return result;
  }

  return "1s";
}

export function toReadableAllycode(allycode) {
  const string = allycode.toString();
  return string.substring(0, 3) + '-' + string.substring(3, 6) + '-' + string.substring(6, 9);
}

export function toValidAllycode(allycode) {
  if (allycode.toString().includes("-")) {
    allycode = parseInt(allycode.toString().replaceAll("-", ""));
  }
  return parseInt(allycode);
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function pad(numberString, size) {
  let padded = numberString;
  while (padded.length < size) {
    padded = '0' + padded;
  }
  return padded;
}
