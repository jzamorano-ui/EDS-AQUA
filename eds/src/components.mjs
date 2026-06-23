// components.mjs — el eje TRATAMIENTO (variant) + status multi-canal.
// Genérico por intención: cualquier color (primary/secondary/brand) con sus 3 tratamientos.

export const components = {
  MuiButton: {
    styleOverrides: {
      // un solo override genérico: lee la INTENCIÓN (color) y el TRATAMIENTO (variant)
      root: ({ theme, ownerState }) => {
        const c = theme.vars.palette[ownerState.color];
        const base = { borderRadius: theme.shape.borderRadius };
        if (!c || !c.hover) return base; // status (error/…) usan el hover derivado de MUI
        if (ownerState.variant === 'contained')
          return { ...base, '&:hover': { backgroundColor: c.hover }, '&:active': { backgroundColor: c.active } };
        if (ownerState.variant === 'outlined' || ownerState.variant === 'text')
          return { ...base, ...(c.subtle && { '&:hover': { backgroundColor: c.subtle } }) }; // ghost/text: fondo subtle en hover
        return base;
      },
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
