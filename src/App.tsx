import { useState } from "react";
import { InputGroup, FormControl, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssues, fetchRepoDetails } from "./redux/operations/fetchOperations";
import { selectIssues } from "./redux/selectors/issueSelectors";
import { selectRepoDetails } from "./redux/selectors/repoSelectors";
import { AppDispatch, RootState } from "./redux/store";
import KanbanBoard from "./components/KanbanBoard";
import RepoDetails from "./components/RepoDetails";


const App: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const issues = useSelector((state: RootState) => selectIssues(state));
  const repoDetails = useSelector((state: RootState) => selectRepoDetails(state));

  const handleLoadIssues = () => {
    const [owner, repo] = repoUrl.replace("https://github.com/", "").split("/");
    if (owner && repo) {
      dispatch(fetchIssues({ owner, repo }));
      dispatch(fetchRepoDetails({ owner, repo }));
    }
  };

  return (
    <Container className="mt-4" >
      <InputGroup className="mb-3" style={{ width: '70%', margin: '0 auto'}} >
        <FormControl style={{ width: '400px', border: '1px solid darkgrey'}}
          placeholder="Enter repo URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
        <Button variant="primary" style={{ width: '100px', marginLeft:"20px", backgroundColor:"white", color:"grey", border: '1px solid darkgrey'}} onClick={handleLoadIssues}>Load</Button>
      </InputGroup>

      {repoDetails && <RepoDetails repoDetails={repoDetails} />}

      <KanbanBoard issues={issues} />
    </Container>
  );
};

export default App;
