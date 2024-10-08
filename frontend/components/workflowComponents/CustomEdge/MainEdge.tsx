"use client"
import { Edge, EdgeLabelRenderer, getBezierPath, Node } from '@xyflow/react';
import { Plus } from 'lucide-react';
import React from 'react';
import { EdgeProps } from 'reactflow';

const MainEdge = (props: EdgeProps & { setNodes: any, setEdges: any, nodes: Node[], edges: Edge[] }) => {
    const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, setNodes, setEdges, nodes, edges, source, target } = props;


    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
    });

    const handlePlusClick = () => {
        const newNodeId = `${nodes.length + 1}`;
        
        const targetNode = nodes.find((node) => node.id === target);
        if (!targetNode) return; 

        const targetIndex = targetNode.data.index;

        const lastNodeId = edges.find(e=>e.type ==='customPartialEdge')?.target
        
        const newNode = {
            id: newNodeId,
            type: 'Action',
            data: {
                name: 'New Action',
                index: targetIndex, 
                metadata: {},
            },
            position: {
                x: (sourceX/3), 
                y: (sourceY + targetY) / 2 + 100, 
            },
        };
        
        
        setNodes((prevNodes: Node[]) => {
            
            return prevNodes.map((node) => {
                if (node.id === target) {
                    
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            //@ts-ignore
                            index: node.data.index + 1, 
                        },
                        position: {
                            ...node.position,
                            y: node.position.y + 300,
                        },
                    };
                    //@ts-ignore
                } else if (node.data.index > targetIndex) {
                    return {
                        ...node,
                        data:{
                            ...node.data,
                            //@ts-ignore
                            index: node.data.index + 1,
                        },
                        position: {
                            ...node.position,
                            y: node.position.y + 300,
                        },
                    };
                }
                return node;
            }).concat(newNode); 
        });
        
        setEdges((prevEdges: Edge[]) => [
            ...prevEdges.filter((edge) => edge.id !== id && edge.type !== 'customPartialEdge'), 
            {
                id: `${source}-${newNodeId}`,  
                source: source,
                target: newNodeId,
                type: 'mainEdge',
                animated: true,
            },
            {
                id: `${newNodeId}-${target}`, 
                source: newNodeId,
                target: target,
                type: 'mainEdge',
                animated: true,
            },{
                id: `${nodes.length}`, 
                source: lastNodeId,
                target: lastNodeId,
                type: 'customPartialEdge',
                animated: true,
            }
        ]);
    };

    return (
        <>
            <EdgeLabelRenderer>
                <div
                    className="absolute h-9 w-1 bg-gradient-to-b from-indigo-300 via-indigo-500 to-indigo-700"
                    style={{
                        transform: `translate(-50%,-50%) translate(${labelX}px, ${labelY - 44}px)`,
                    }}
                ></div>

                <div className="group" onClick={handlePlusClick}>
                    <div
                        className="absolute hover:bg-purple_used text-purple_used hover:text-white cursor-pointer transition-all duration-500 rounded-full pointer-events-auto"
                        style={{
                            transform: `translate(-50%,-50%) translate(${labelX}px, ${labelY}px)`,
                        }}
                    >
                        <Plus size={30} />
                    </div>
                    <div
                        className="absolute bg-gray-800 text-white rounded-full px-3 py-2 font-bold opacity-0 group-hover:opacity-100"
                        style={{
                            transform: `translate(-50%,-50%) translate(${labelX + 90}px, ${labelY}px)`,
                        }}
                    >
                        ADD STEPS
                    </div>
                </div>

                <div
                    className="h-9 w-1 bg-gradient-to-t from-indigo-300 via-indigo-500 to-indigo-700 absolute"
                    style={{
                        transform: `translate(-50%,-50%) translate(${labelX}px, ${labelY + 44}px)`,
                    }}
                ></div>
            </EdgeLabelRenderer>
        </>
    );
};


export default MainEdge;
