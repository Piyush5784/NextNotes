// components/MusicPlayer.tsx
"use client";

import axios from "axios";
import { useState } from "react";

const MusicPlayer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [playingSong, setPlayingSong] = useState("");
  const [track, setTrack] = useState();

  const fetchSongs = async (query: string) => {
    try {
      const response = await axios.get(
        `https://itunes.apple.com/search?term=${query}&media=music&limit=10`
      );
      setSongs(response.data.results);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchSongs(searchQuery);
    }
  };

  const handleSongChange = (song: any) => {
    setTrack(song);
    console.log(song);
    setPlayingSong(song.previewUrl);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Music Player</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Search for a song"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>

      {songs.length > 0 && (
        <ul className="space-y-4">
          {songs.map((song: any) => (
            <li key={song.trackId} className="flex items-center space-x-4">
              <img
                src={song.artworkUrl100}
                alt={song.trackName}
                className="w-16 h-16"
              />
              <div>
                <p>{song.trackName}</p>
                <p className="text-gray-500">{song.artistName}</p>
              </div>
              <button
                onClick={() => handleSongChange(song)}
                className="bg-green-500 text-white p-2 rounded"
              >
                Play
              </button>
            </li>
          ))}
        </ul>
      )}

      {playingSong && (
        <div className="mt-4">
          <h3 className="text-xl">Now Playing:</h3>
          <audio controls src={playingSong} autoPlay className="w-full mt-2" />
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
