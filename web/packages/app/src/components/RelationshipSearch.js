import { 
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import React from 'react';

import { useFetchRelationshipsByNodeIdQuery } from '../features/comptoxApiSlice';
import { useAppSelector } from '../redux/hooks';

const columns = [
  { id: 'start', label: 'Start Node', align: 'center' },
  { id: 'relType', label: 'Relationship Type', align: 'center'},
  { id: 'end', label: 'End Node', align: 'center' }
];

const useStyles = makeStyles({
  container: {
    maxHeight: 440,
  },  
});

const RelationshipTable = (props) => {
  const { data } = props;
  const classes = useStyles();

  const rows = data.map((d) => ({
    start: d.fromNode.commonName,
    relType: `\u27E8${d.relType}\u27E9`,
    end: (d.toNode.commonName) ? d.toNode.commonName : d.toNode.nodeId  // TODO: FIX THIS! EVERYTHING SHOULD HAVE A COMMON NAME!
  }));

  console.log(data);

  return (
    <Paper>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell align='center'>
                        {
                          (column.id === 'start') ? (
                            <Button style={{justifyContent: "flex-start"}}>{value}</Button>
                          ) : (column.id === 'end') ? (
                            <Button>{value}</Button>
                          ) : value
                        }
                        {/* {value} */}
                      </TableCell>
                    )
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

const RelationshipSearch = (props) => {
  const selectedRel = useAppSelector((state) => state.relationship.relStartNode)

  const skip = (selectedRel) ? false : true;
  
  console.log(skip);
  console.log(selectedRel);
  
  const { data = [], error, isLoading, isUninitialized } = useFetchRelationshipsByNodeIdQuery(selectedRel, {
    skip,
  });


  
  return(
    <div id="rel-search">
      <h2>Relationships</h2>
      {error ? (
        <></>
      ) : isUninitialized ? (
        <p><i>Search for a node in the box above and click "Load relationships" to show all linked nodes.</i></p>
      ) : isLoading ? (
        <>Loading relationships...</>
      ) : data ? (
        <div>
          <p><i>Click a Start Node or End Node to view its data in "Node Results".</i></p>
          <RelationshipTable data={data}/>
        </div>
      ) : null}
      
      {/* <RelationshipTable data={data}/> */}
    </div>
  );
}


export default RelationshipSearch;
