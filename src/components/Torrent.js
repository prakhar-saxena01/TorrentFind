import { useState } from "react";
import {
  CardContent,
  Card,
  Typography,
  CardActions,
  Link,
} from "@mui/material";
const Torrent = ({ t, s }) => {
  const [isCopied, setCopied] = useState(false);
  const copyHandler = async (text) => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } else {
      document.execCommand("copy", true, text);
      setCopied(false);
    }
  };
  return (
    <>
      {s === "yts" ? (
        t.quality.map((q) => (
          <Card key={q.magnet} sx={{ mb: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t.name} ({q.quality})
              </Typography>
              <Typography variant="body2">
                Size: {q.size} | Leech: {q.leech} | Seeds: {q.seed}
              </Typography>
            </CardContent>
            <CardActions>
              <Link
                src={q.magnet}
                underline="none"
                onClick={() => copyHandler(q.magnet)}
                sx={{ cursor: "pointer" }}
                component="button"
              >
                {isCopied ? (
                  <Typography variant="button">Copied</Typography>
                ) : (
                  <Typography variant="button">Magnet</Typography>
                )}
              </Link>
            </CardActions>
          </Card>
        ))
      ) : (
        <Card sx={{ mb: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {t.name}
            </Typography>
            <Typography variant="body2">
              Size: {t.size} | Leech: {t.leech} | Seeds: {t.seed}
            </Typography>
          </CardContent>
          <CardActions>
            <Link
              src={t.magnet}
              underline="none"
              onClick={() => copyHandler(t.magnet)}
              sx={{ cursor: "pointer" }}
              component="button"
            >
              {isCopied ? (
                <Typography variant="button">Copied</Typography>
              ) : (
                <Typography variant="button">Magnet</Typography>
              )}
            </Link>
          </CardActions>
        </Card>
      )}
    </>
  );
};
export default Torrent;
