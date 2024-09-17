"use client"
import { Edge, EdgeLabelRenderer, getBezierPath, Node } from '@xyflow/react'
import { randomUUID } from 'crypto'
import { Plus } from 'lucide-react'
import React, { useEffect } from 'react'
import { EdgeProps,  } from 'reactflow'

const MainEdge = (props:EdgeProps & {setNodes:any,setEdges:any, nodes:Node[], edges:Edge[]}) => {
    const {sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, setNodes, setEdges, nodes, edges, source, target} = props;

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition, 
        targetPosition
    });
  
    const handleClick = () => {
        
    }


  return (
    <>
    <EdgeLabelRenderer>
        <div className='absolute h-9 w-1 bg-gradient-to-b from-indigo-300 via-indigo-500 to-indigo-700'
         style={{
          transform: `translate(-50%,-50%) translate(${labelX}px, ${labelY-44}px)`,
        }}
        >

        </div>
        <div className='group'
          onClick={handleClick}
        >
          <div 
          className="absolute  hover:bg-purple_used text-purple_used hover:text-white cursor-pointer transition-all duration-500 rounded-full pointer-events-auto" 
          style={{
              transform: `translate(-50%,-50%) translate(${labelX}px, ${labelY}px)`,
          }}
          >
          <Plus size={30} />
          </div>
          <div className='absolute bg-gray-800 text-white rounded-full px-3 py-2 font-bold opacity-0 group-hover:opacity-100'
            style={{
              transform: `translate(-50%,-50%) translate(${labelX + 90}px, ${labelY}px)`,
            }}
          >
            ADD STEPS
          </div>
        </div>
        <div className='h-9 w-1 bg-gradient-to-t  from-indigo-300 via-indigo-500 to-indigo-700 absolute'
         style={{
          transform: `translate(-50%,-50%) translate(${labelX}px, ${labelY+44}px)`,
        }}
        >

        </div>
    </EdgeLabelRenderer>
    </>
  )
}

export default MainEdge