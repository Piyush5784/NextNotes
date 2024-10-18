// import axios from "axios";

// export const getSpotifyToken = async () => {
//   try {
//     const clientId =
//       process.env.SPOTIFY_CLIENT_ID || "4cfb300c4f854247b4c832e4c42871ad";
//     const clientSecret =
//       process.env.SPOTIFY_CLIENT_SECRET || "ab4ba95e38a443f386ff470b3371ef0f";
//     console.log(clientId, clientSecret);
//     const response = await axios.post(
//       "https://accounts.spotify.com/api/token",
//       null,
//       {
//         params: {
//           grant_type: "client_credentials",
//         },
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
//         },
//       }
//     );

//     return response.data.access_token;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

// export const searchSpotify = async (query: string, token: string) => {
//   try {
//     const res = await axios.get(
//       `https://api.spotify.com/v1/search?q=${encodeURIComponent(
//         query
//       )}&type=track&limit=10`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return res?.data?.tracks?.items || [];
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };
