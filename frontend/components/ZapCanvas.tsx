"use client"

import MainEdge from '@/components/workflowComponents/CustomEdge/MainEdge';
import * as Node from '@/components/workflowComponents/CustomNodes/Trigger';
import { initialEdges, initialNodes } from '@/components/workflowComponents/utils/Workflow.constants';
import { Background, Connection, Controls, Position, ReactFlow, addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';

export default function ({
    name,
    index
}:{ 
    name?:string,
    index:number
}){ 

    const [selectedTrigger, setSelectedTrigger] = useState("");
    const [selectedActions, setSelectedActions] = useState<{
        availableActionId:string,
        availableActionName: string,
    }[]>([]);


    const [nodes, setNodes] = useState(initialNodes)

    const [edges, setEdges] = useState(initialEdges)

    const onNodeChange = useCallback((changes:any)=>setNodes((Nds)=>applyNodeChanges(changes,Nds)),[])

    const onEdgeChange = useCallback((changes:any)=>{setEdges((eds:any)=>applyEdgeChanges(changes,eds))},[])

    const onConnect = useCallback((connection:Connection)=>{
        const edge = {...connection, animated:true, id: `${edges.length} + 1`, type:'mainEdge'}
        setEdges((eds:any)=>addEdge(edge,eds))
    },[])

    const nodeTypes = {
        'Trigger':(props:any)=><Node.Trigger {...props} name={name} index={index} /> ,
        'Actions':(props:any) => <Node.Action {...props} name={name} index={index}/>
    }

    const edgeTypes = {
        'mainEdge': (props:any)=><MainEdge {...props} setNodes={setNodes} setEdges={setEdges} nodes={nodes} edges={edges}/>
    }

    return <div className="flex w-full h-screen bg-slate-200 flex-col justify-center">
        <ReactFlow 
            nodes={nodes} 
            edges={edges}
            onNodesChange={onNodeChange}
            onEdgesChange={onEdgeChange}
            nodesDraggable={false}
            nodesConnectable={false}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitViewOptions={
                {
                    minZoom:0.1,
                    maxZoom:1
                }
            }
            fitView
            >
            <Background/>
            <Controls/>
        </ReactFlow>
    </div>
}