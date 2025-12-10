import StartNode from "./StartNode";
import TaskNode from "./TaskNode";
import ApprovalNode from "./ApprovalNode";
import AutoNode from "./AutoNode";
import EndNode from "./EndNode";

export const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  auto: AutoNode,
  end: EndNode,
};
