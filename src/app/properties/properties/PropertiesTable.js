import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { normalizeCOPCurrencyValue } from 'src/app/utils';
import { selectProductsSearchText } from '../store/productsSlice';
import PropertiesTableHead from './PropertiesTableHead';
import { useDeleteBuildsMutation, useGetBuildsQuery } from '../../api';
import { propertiesTypesOptions } from '../../mock'

function PropertiesTable(props) {
  const [performBuildDelete, buildDeleteEvents] = useDeleteBuildsMutation();

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  const buildsResponse = useGetBuildsQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  
  useEffect(() => {

    if (buildDeleteEvents.isUninitialized) return;
    if (buildDeleteEvents.isLoading) return;
    if (buildDeleteEvents.isError) {
      alert('Error al eliminar algunos registros');
    }
  }, [buildDeleteEvents]);
  useEffect(() => {
    if (buildsResponse.isUninitialized) return;
    if (buildsResponse.isLoading) return;
    if (buildsResponse.isSuccess) {
      setLoading(false);
      setData(buildsResponse.data.Builds);
    }
  }, [buildsResponse]);

  // useEffect(() => {

  //   dispatch(getProducts()).then(() => setLoading(false));
  // }, [dispatch]);

  // useEffect(() => {
  //   if (searchText.length !== 0) {
  //     setData(
  //       _.filter(products, (item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
  //     );
  //     setPage(0);
  //   } else {
  //     setData(products);
  //   }
  // }, [products, searchText]);

  const handleRemoveItems = async (ids) => {
    // console.log(ids);
    try {
      await Promise.all(
        ids.map((id) =>
          performBuildDelete({
            deleteBuildsId: id,
          })
        )
      );
      buildsResponse.refetch();
    } catch (error) {
      console.error(error);
    }
  };

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function navigateToDetail(id) {
    props.navigate(`/properties/${id}`);
  }

  function handleCheck(event, id) {
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
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          No hay propiedades!
        </Typography>
      </motion.div>
    );
  }

  const renderStatus = (status) => {
    let textColor = '';
    let statusLabel = '';

    switch (status) {
      case 'draft':
        textColor = 'text-black-500';
        statusLabel = 'Creado';
        break;
      case 'completed':
        textColor = 'text-green-500';
        statusLabel = 'Completado';
        break;
      case 'deleted':
        textColor = 'text-red-500';
        statusLabel = 'Eliminado';
        break;
      default:
        break;
    }

    return <div className={textColor}>{statusLabel}</div>;
  };

  const renderPropertyStatus = () => {
    const propertiesStatus = {
      0: 'Rentada',
      1: 'Vendida',
      2: 'Activa',
      3: 'Cancelada',
    }
    const colors = {
      0: 'text-orange-500',
      1: 'text-gray-500',
      2: 'text-green-500',
      3: 'text-red-500',
    }
    // return ramdon value from 0 to 3
    const randomPropertyStatus = Math.floor(Math.random() * 4);
    
    return <div className={colors[randomPropertyStatus]}>{propertiesStatus[randomPropertyStatus]}</div>;
  }


  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <PropertiesTableHead
            selectedProductIds={selected}
            onRemoveItems={handleRemoveItems}
            onEditItem={navigateToDetail}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case 'categories': {
                      return o.categories[0];
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={(event) => navigateToDetail(n.id)}
                  >
                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell>

                    <TableCell
                      className="w-52 px-4 md:px-0"
                      component="th"
                      scope="row"
                      padding="none"
                    >
                      {n.imgs?.length ? (
                        <img className="w-full block rounded" src={n.imgs[0].url} alt={n.name} />
                      ) : (
                        <img
                          className="w-full block rounded"
                          src="assets/images/apps/ecommerce/product-image-placeholder.png"
                          alt={n.name}
                        />
                      )}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.name}
                    </TableCell>

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                      {propertiesTypesOptions.find(i => i.value == n.propertyType)?.label}
                    </TableCell>

                    {/* <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.description}
                    </TableCell> */}

                    {/* <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.lotArea}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.numberRooms}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.numberBathrooms}
                    </TableCell> */}

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      $ {normalizeCOPCurrencyValue(n.price)}
                      {/* {n.price} */}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {renderPropertyStatus()}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {renderStatus(n.status)}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[7, 10, 25, 50]}
        labelRowsPerPage="Filas por página"
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(PropertiesTable);
