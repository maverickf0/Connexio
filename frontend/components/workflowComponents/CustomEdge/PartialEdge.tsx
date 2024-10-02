"use client"
import { Edge, EdgeLabelRenderer, getBezierPath, Node } from '@xyflow/react';
import { Plus } from 'lucide-react';
import React from 'react';
import { EdgeProps } from 'reactflow';

const PartialEdge = (props: EdgeProps & { setNodes: any, setEdges: any, nodes: Node[], edges: Edge[] }) => {
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
        
        const targetNode = nodes[nodes.length - 1];
        if (!targetNode) return; 

        const targetIndex = targetNode.data.index;


       
        const newNode = {
            id: newNodeId,
            type: 'Action',
            data: {
                name: 'New Action',
                //@ts-ignore
                index: targetIndex + 1, 
                metadata: {},
            },
            position: {
                x: (sourceX/3), 
                y: (2 * sourceY) / 2 + 100, 
            },
        };
        
        
        setNodes((prevNodes:Node[])=>[...prevNodes, newNode])

        setEdges((prevEdges: Edge[]) => [
            ...prevEdges.filter((edge) => edge.id !== id),
            {
                id: `${source}-${newNodeId}`,  
                source: source,
                target: newNodeId,
                type: 'mainEdge',
                animated: true,
            },
            {
                id: `${newNodeId}-${newNodeId}`, 
                source: newNodeId,
                target: newNodeId,
                type: 'partialEdge',
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
                        transform: `translate(-50%,-50%) translate(${labelX}px, ${labelY + 80}px)`,
                    }}
                ></div>

                <div className="group" onClick={handlePlusClick}>
                    <div
                        className="absolute hover:bg-purple_used text-purple_used hover:text-white cursor-pointer transition-all duration-500 rounded-full pointer-events-auto"
                        style={{
                            transform: `translate(-50%,-50%) translate(${labelX}px, ${labelY + 120}px)`,
                        }}
                    >
                        <Plus size={30} />
                    </div>
                    <div
                        className="absolute bg-gray-800 text-white rounded-full px-3 py-2 font-bold opacity-0 group-hover:opacity-100"
                        style={{
                            transform: `translate(-50%,-50%) translate(${labelX + 90}px, ${labelY + 90}px)`,
                        }}
                    >
                        ADD STEPS
                    </div>
                </div>

                {/* <div
                    className="h-9 w-1 bg-gradient-to-t from-indigo-300 via-indigo-500 to-indigo-700 absolute"
                    style={{
                        transform: `translate(-50%,-50%) translate(${labelX}px, ${labelY + 44}px)`,
                    }}
                ></div> */}
            </EdgeLabelRenderer>
        </>
    );
};


export default PartialEdge;
