// import { useState } from "react";
// import {
//   CardContent,
//   Card,
//   Typography,
//   CardActions,
//   Button,
//   Link,
// } from "@mui/material";
// const Torrent = ({ t, s }) => {
//   const [isCopied, setCopied] = useState(false);
//   const copyHandler = async (text) => {
//     if ("clipboard" in navigator) {
//       await navigator.clipboard.writeText(text);
//       setCopied(true);
//     } else {
//       document.execCommand("copy", true, text);
//       setCopied(false);
//     }
//   };
//   return (
//   <Card>
//     <CardContent>
//       <Typography variant="h6" gutterBottom>
//         {t.name}
//       </Typography>
//       <Typography variant="body2">
//         Size: {t.size} | Leech: {t.leech} | Seeds: {t.seed}
//       </Typography>
//     </CardContent>
//     <CardActions>
//       <Link
//         src={t.magnet}
//         underline="none"
//         onClick={() => copyHandler(t.magnet)}
//         sx={{ cursor: "pointer" }}
//         component="button"
//       >
//         {isCopied ? (
//           <Typography variant="button">Copied</Typography>
//         ) : (
//           <Typography variant="button">Magnet</Typography>
//         )}
//       </Link>
//     </CardActions>
//   </Card>
//   )
// };
// export default TCard;
