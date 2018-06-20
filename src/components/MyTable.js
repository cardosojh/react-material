import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import TableHeader from './TableHeader';

function createData(id, nome, tipo, valor, status) {
  return { id: id, nome, tipo, valor, status };
}

function getSorting(order, orderBy) {
  console.log(orderBy);
  console.log(order);

  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

class MyTable extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'id',
      data: [
        createData(1, 'Data Criação', 'Data', '10/10/1990', 'Ativo'),
        createData(2, 'Valor Multa', 'Decimal', '45.00', 'Inativo'),
        createData(3, 'Valor', 'Decimal', '50.00', 'Ativo'),
        createData(4, 'Número Inscrição', 'Texto', '', 'Inativo'),
        createData(5, 'Customizado', 'Texto', '10/10/1990', 'Ativo'),
      ]      
    };
  }

  handleRequestSort = (property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (     
        
        <div>
          
          <Table aria-labelledby="tableTitle">
            <TableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .map(value => {
                  return (
                    <TableRow key={value.id}>                      
                      <TableCell>{value.id}</TableCell>
                      <TableCell>{value.nome}</TableCell>
                      <TableCell>{value.tipo}</TableCell>
                      <TableCell>{value.valor}</TableCell>
                      <TableCell>{value.status}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>        
      
    );
  }
}

export default MyTable;