//modules and dependencies
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import AddBookComponent from "./components/AddBookComponent";

//React Components
import BookListComponent from "./components/BookListComponent";
import "./styles.css";

//Apollo client setup
const client = new ApolloClient({
  uri: "https://fyq4p3-65247.csb.app/graphql"
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        {/* <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2> */}
        <BookListComponent />
        {/* AddBookComponent */}
        <AddBookComponent />
      </div>
    </ApolloProvider>
  );
}
