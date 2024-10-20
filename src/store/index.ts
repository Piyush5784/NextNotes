import { atom } from "recoil";
export const songAtom = atom({
  key: "songAtom",
  default: "",
});

export const spotifyTokenAtom = atom({
  key: "SoptifyAtomToken",
  default: "",
});

export type SpotifyTrack = {
  id: string;
  name: string;
  duration_ms: number;
  artists: { name: string }[];
  album: { name: string; images: { url: string }[] };
  preview_url: string | null;
};
export const spotifyTracks = atom({
  key: "SpotifyTracksAtom",
  default: [],
});

export const selectedNote = atom({
  key: "selectedNoteAtom",
  default: 0,
});
