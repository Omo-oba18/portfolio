import { Pagination as PaginationComponent } from "@mui/material";

export function Pagination({ count, onChange, ...other }) {
  return <PaginationComponent count={count} onChange={onChange} {...other} />;
}
