
import { useAvailableActionsAndTriggers } from "@/app/zap/create/page";
import { Node } from "@xyflow/react"
import {Edge} from "reactflow"

export const initialEdges:Edge[] = [
  {
    id:'1-2',
    source:'1', 
    target:'2', 
    type:"mainEdge",
  },
  {
    id: 'partial-edge',
    source: '2',
    target: '2',
    type: 'customPartialEdge', 
  }
]


export const initialNodes: Node[] =[
  {
    id:"1",
    position:{x: 100, y:100}, 
    data: { name:"Trigger", index : 1},
    type:"Trigger"
  },
  {
    id:"2",
    position:{x: 100, y:400}, 
    data: { name:"Action", index: 2},
    type:"Action"
  },
]



