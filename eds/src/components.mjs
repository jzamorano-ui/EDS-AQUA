// components.mjs — styleOverrides de fricción (lo escrito a mano, no generado).
// Cubre el ~20% donde MUI no calza 1:1: estados explícitos + status multi-canal.

export const components = {
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({ borderRadius: theme.shape.borderRadius }),
      // estado hover/active EXPLÍCITO (nuestro token), no el derivado de MUI
      containedPrimary: ({ theme }) => ({
        '&:hover': { backgroundColor: theme.vars.palette.primary.hover },
        '&:active': { backgroundColor: theme.vars.palette.primary.active },
      }),
      containedSecondary: ({ theme }) => ({
        '&:hover': { backgroundColor: theme.vars.palette.secondary.hover },
        '&:active': { backgroundColor: theme.vars.palette.secondary.active },
      }),
    },
  },
  MuiAlert: {
    styleOverrides: {
      // status multi-canal (bg/text/icon/border) — lo que MUI colapsa a 1 color
      standardError:   ({ theme }) => statusAlert(theme, 'danger'),
      standardWarning: ({ theme }) => statusAlert(theme, 'warning'),
      standardInfo:    ({ theme }) => statusAlert(theme, 'info'),
      standardSuccess: ({ theme }) => statusAlert(theme, 'success'),
    },
  },
};

const statusAlert = (theme, k) => ({
  backgroundColor: theme.vars.palette.status[k].bg,
  color: theme.vars.palette.status[k].text,
  border: `1px solid ${theme.vars.palette.status[k].border}`,
  '& .MuiAlert-icon': { color: theme.vars.palette.status[k].icon },
});
