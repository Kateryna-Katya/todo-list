import { Col } from "react-bootstrap";
import { Droppable } from '@hello-pangea/dnd';
import IssueCard from "./IssueCard";

interface Issue {
  id: number;
  title: string;
  state: string;
  assignee: null | { login: string };
  html_url: string;
}

const Column = ({ title, issues, columnId }: { title: string; issues: Issue[]; columnId: string }) => {
  return (
    <Col md={4} >
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} >
            <h4>{title}</h4>
            {issues.map((issue, index) => (
              <IssueCard key={issue.id} issue={issue} index={index}  />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Col>
  );
};

export default Column;

