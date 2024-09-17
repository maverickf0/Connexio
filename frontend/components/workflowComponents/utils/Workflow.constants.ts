
import { Node } from "@xyflow/react"
import {Edge} from "reactflow"

export const initialEdges:Edge[] = [
  {
    id:'1-2',
    source:'1', 
    target:'2', 
    type:"mainEdge",
  },{
    id:'2-3',
    source:'2',
    target:'3',
  }
]

export const initialNodes: Node[] =[
  {
    id:"1",
    position:{x: 100, y:100}, 
    data: { amount:10 },
    type:"Trigger"
  },
  {
    id:"2",
    position:{x: 100, y:320}, 
    data: { amount:10 },
    type:"Trigger"
  }, 
  {
    id:"3",
    position:{x: 100, y:540}, 
    data: { amount:10 },
    type:"notSelected"
  }
]

export const initialElements = [...initialNodes,...initialEdges]
