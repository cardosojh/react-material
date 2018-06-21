import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

import Button from '@material-ui/core/Button';

import MyTableUtils from './MyTableUtils';

const columnData = [
  { id: 'nome', numeric: false, disablePadding: true, label: 'Nome' },
  { id: 'tipo', numeric: true, disablePadding: false, label: 'Tipo' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>          
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
          <TableCell padding="checkbox">
            
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            Metadados
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 5,
  }),
  tableWrapper: {
    overflowX: 'auto',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'id',
      selected: [],
      data: [
        MyTableUtils.createData(1, 'Valor', 'Decimal', 3.7, 67, 4.3),
        MyTableUtils.createData(2, 'Data Criação', 'Data', 25.0, 51, 4.9),
        MyTableUtils.createData(3, 'Responsável', 'Texto', 16.0, 24, 6.0),
        MyTableUtils.createData(4, 'Data Vencimento', 'Decimal', 6.0, 24, 4.0),
        MyTableUtils.createData(5, 'Valor Multa', 'Decimal', 16.0, 49, 3.9)
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

  handleClick = (event, id) => {
    const { selected } = this.state;
    console.log('Clicou na handleClick');
    console.log(id);
    console.log(event);
    /*
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
    */
  };

  handleClickDelete = (event, id) => {
    const { selected } = this.state;
    console.log('Clicou no handleClickDelete');
    console.log(id);
    console.log(event);    
  };

  handleClickAdd = () => {
    console.log('Clicou no handleClickAdd');
    const data = this.state.data;
    this.setState({ data: data.concat({}) });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (

      <div>
        <br />
        <Button variant="contained" className={classes.button} onClick={event => this.handleClickAdd(event)}>
          Adicionar Campo
        </Button>
        
        <Paper className={classes.root}>      
          <EnhancedTableToolbar numSelected={selected.length} />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {data
                  .sort(MyTableUtils.getSorting(order, orderBy))
                  .map(n => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover                        
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={MyTableUtils.generateKey()}
                        selected={isSelected}
                      >                        
                        <TableCell component="th" scope="row" padding="none" 
                                   onClick={event => this.handleClick(event, n.id)}>
                          {n.nome}
                        </TableCell>
                        <TableCell onClick={event => this.handleClick(event, n.id)}>{n.tipo}</TableCell>
                        <TableCell onClick={event => this.handleClick(event, n.id)}>{n.fat}</TableCell>
                        <TableCell onClick={event => this.handleClick(event, n.id)}>{n.carbs}</TableCell>
                        <TableCell>                          
                          <IconButton aria-label="Delete">
                            <DeleteIcon onClick={event => this.handleClickDelete(event, n.id)}/>
                          </IconButton>                          
                        </TableCell>

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
        </Paper>

        <Button variant="contained" className={classes.button}>
          Salvar
        </Button>
        <Button variant="contained" className={classes.button}>
          Cancelar
        </Button>  

      </div> 
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);