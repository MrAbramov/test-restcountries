import * as React from 'react';

import {
  Button,
  ButtonGroup,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  TableRow,
} from '@mui/material';

import { Box } from '@mui/system';

import { getAllCountries, getAllCountriesByRegion, getCountyByName } from '../api/CountriesAPI';

import { Country } from '../types/country';
import { columns } from '../constants/country';

export default function TableCountryComponent() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [countriesBuffer, setCountriesBuffer] = React.useState<Country[]>([]);
  const [rows, setRow] = React.useState<Country[]>([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    getAllCountries().then((countries) => {
      setRow(countries);
      setCountriesBuffer(countries);
    });
  }, []);

  const handleRegion = (region: string = 'Oceania') => {
    // Можно было бы и через фильтр но решил использовать api по максимум
    getAllCountriesByRegion(region).then((countries) => setRow(countries));
  };

  const handleSmallerThen = async (region: string = 'Lithuania') => {
    const country = (await getCountyByName(region))[0];

    const filterCountries = countriesBuffer.filter(
      (countryItem: Country): Boolean => countryItem.area < country.area,
    );

    setRow(filterCountries);
  };

  const handleSortBy = () => {
    // Было бы больше параметров сделал чере objec {}
    setRow([...rows].reverse());
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <ButtonGroup
          sx={{ width: '100%' }}
          variant="contained"
          aria-label="outlined primary button group">
          <Button onClick={() => handleSmallerThen()}>Smaller then Lithuanis</Button>
          <Button onClick={() => handleRegion()}>Oceania region</Button>
          <Button onClick={() => handleSortBy()} sx={{ marginLeft: 'auto' }}>
            Sort Ask / Desk
          </Button>
        </ButtonGroup>
      </Box>

      <TableContainer sx={{ maxHeight: '64vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name + row.region}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={row.name + row.area + column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
