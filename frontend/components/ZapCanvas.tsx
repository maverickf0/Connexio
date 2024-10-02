"use client"

import MainEdge from '@/components/workflowComponents/CustomEdge/MainEdge';
import * as Node from '@/components/workflowComponents/CustomNodes/Trigger';
import { Background, Connection, Controls, EdgeProps, NodeProps, Position, ReactFlow, ReactFlowProvider, addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React, { useCallback, useState } from 'react';
import PartialEdge from './workflowComponents/CustomEdge/PartialEdge';

export default function ({
    name,
    onClick,
    index,
    setNodes,
    setEdges,
    nodes,
    edges,
    setSelectedModalIndex,
    selectedActions,
    selectedTrigger
}:{ 
    name?:string,
    onClick:()=>void;
    index:number;
    setNodes: React.Dispatch<React.SetStateAction<any>>;
    setEdges: React.Dispatch<React.SetStateAction<any>>;
    nodes:any;
    edges:any;
    setSelectedModalIndex: React.Dispatch<React.SetStateAction<number | null>>
    selectedActions:{
    index: number,
    availableActionId: string,
    availableActionName:string,
    metadata:{}
    }[]
    selectedTrigger:{
        id:string,
        name:string
    } | undefined
}){ 

    // const [nodes, setNodes] = useState(initialNodes)

    // const [edges, setEdges] = useState(initialEdges)

    function handleNodeClick (event:React.MouseEvent, node:any){
        if(node.type === 'Trigger'){
            
            setSelectedModalIndex(parseInt(node.id))
            node.data.name = selectedTrigger?.name;
        }
        else{
            const action = selectedActions.find(a=>a.index == node.id)
            node.data.name = action?.availableActionName
            setSelectedModalIndex(parseInt(node.id))
        }
    } 



    const onNodeChange = useCallback((changes:any)=>setNodes((Nds:any)=>applyNodeChanges(changes,Nds)),[])

    const onEdgeChange = useCallback((changes:any)=>{setEdges((eds:any)=>applyEdgeChanges(changes,eds))},[])

    const onConnect = useCallback((connection:Connection)=>{
        const edge = {...connection, animated:true, id: `${edges.length} + 1`, type:'mainEdge'}
        setEdges((eds:any)=>addEdge(edge,eds))
    },[])

    const nodeTypes = {
        'Trigger':(props:any)=><Node.Trigger {...props} name={name} index={index} onClick={()=>{}} /> ,
        'Action':(props:any) => <Node.Action {...props} name={name} index={index} onClick={()=>{}}/>
    }

    const edgeTypes = {
        'mainEdge': (props:any)=><MainEdge {...props} setNodes={setNodes} setEdges={setEdges} nodes={nodes} edges={edges}/>,
        'customPartialEdge': (props:any)=><PartialEdge {...props} setNodes={setNodes} setEdges={setEdges} nodes={nodes} edges={edges}/>
    }

    return <div className="flex w-full h-screen bg-slate-200 flex-col justify-center">
        <ReactFlowProvider>
        <ReactFlow 
            nodes={nodes} 
            edges={edges}
            onNodesChange={onNodeChange}
            onEdgesChange={onEdgeChange}
            onNodeClick={handleNodeClick}
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
        </ReactFlowProvider>
    </div>
}