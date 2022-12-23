/* eslint-disable react/no-unescaped-entities */

import * as React from 'react';
import { styled, darken } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@/components/Link';

// const StyledButton = styled(Button)`
//   /* background: #20b2aa; */

//   :hover {
//     /* background: #2e8b57; */
//   }
// `;

const StyledLink = styled(Link)(
  ({ theme }) => `
  background: ${theme.palette.primary.main};
  color: #fff;
  padding: ${theme.spacing(1, 2)};

  :hover {
    background: ${darken(theme.palette.primary.main, 0.2)};
  }
`,
);

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          All the Pokémon data you'll ever need in one place!
        </Typography>
        <StyledLink href="/type" color="primary">
          Go to Pokemon Types page
        </StyledLink>
      </Box>
    </Container>
  );
}