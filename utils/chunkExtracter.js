function splitTranscript(subtitles, chunkSize = 3000) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.slice(start, end));
    start = end;
  }
  return chunks;
}
