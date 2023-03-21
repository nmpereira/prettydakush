import { AppWrapper } from "./Components/App/App.styles"
import Pagination from "./Components/Pagination/Pagination"
import Table from "./Components/Table/Table"
import { TableWrapper } from "./Components/Table/Table.styles"




function App() {


  return (
     <div className="App">
      <AppWrapper>

      <TableWrapper >

        <Table />
      </TableWrapper>
         
      </AppWrapper>
    </div>
  )
}

export default App
