import { useEffect, useState } from "react";
import { DragDropContext } from '@hello-pangea/dnd';
import { Row } from "react-bootstrap";
import Column from "./Column";

interface Issue {
  id: number;
  title: string;
  state: string;
  assignee: null | { login: string };
  html_url: string;
}

const KanbanBoard = ({ issues }: { issues: Issue[] }) => {
  const [columns, setColumns] = useState<Record<string, Issue[]>>({
    todo: [],
    inProgress: [],
    done: [],
  });

  useEffect(() => {
    if (issues.length) {
      setColumns({
        todo: issues.filter((issue) => !issue.assignee && issue.state === "open"),
        inProgress: issues.filter((issue) => issue.assignee && issue.state === "open"),
        done: issues.filter((issue) => issue.state === "closed"),
      });
    }
  }, [issues]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const newColumns = { ...columns };
    const [movedItem] = newColumns[sourceCol].splice(source.index, 1);

    newColumns[destCol].splice(destination.index, 0, movedItem);

    setColumns(newColumns);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row>
        {Object.entries(columns).map(([key, issues]) => (
          <Column key={key} title={key.toUpperCase()} issues={issues} columnId={key} />
        ))}
      </Row>
    </DragDropContext>
  );
};

export default KanbanBoard;