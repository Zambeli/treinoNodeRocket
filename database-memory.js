import { randomUUID } from "node:crypto";

export class DatabaseMemory {
  #videos = new Map();

  // Set = array q n aceita valores duplicados, Map tem api mt mais legal

  list() {
    return Array.from(this.#videos.values());
  }

  create(video) {
    const videoId = randomUUID();

    this.#videos.set(videoId, video);
  }

  update(id, video) {
    this.#videos.set(id, video);
  }

  delete(id) {
    this.#videos.delete(id);
  }
}
