import { Card } from "react-bootstrap";
import { Draggable } from '@hello-pangea/dnd';

interface Issue {
  id: number;
  title: string;
  state: string;
  assignee: null | { login: string };
  html_url: string;
}

const IssueCard = ({ issue, index }: { issue: Issue; index: number }) => {
  return (
    <Draggable key={issue.id} draggableId={issue.id.toString()} index={index} >
      {(provided) => (
        <Card className="mb-2" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Card.Body >
            <Card.Title>
              <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
                {issue.title}
              </a>
            </Card.Title>
            <Card.Text>
              {issue.assignee ? `Assigned to: ${issue.assignee.login}` : "Unassigned"}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Draggable>
  );
};

export default IssueCard;