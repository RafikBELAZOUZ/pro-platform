// import { ClassValue, clsx } from 'clsx'
// import { twMerge } from 'tailwind-merge'

// export function cn(...inputs: ClassValue[]) {
// 	return twMerge(clsx(inputs))
// }

let id = 0
const getId = () => `newNode${id++}`

export function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
	event.preventDefault()
	event.dataTransfer.dropEffect = 'move'
}

export function handleOnDrop(
	event: React.DragEvent<HTMLDivElement>,
	reactFlowWrapper: any,
	reactFlowInstance: any,
	setNodes: any
) {
	event.preventDefault()
	if (reactFlowWrapper) {
		const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
		const type = event.dataTransfer.getData('application/reactflow')

		// check if the dropped element is valid
		if (typeof type === 'undefined' || !type) {
			return
		}

		// Calculate the mouse position within the canvas, adjusted for scrolling and zoom
        const mouseX = event.clientX - reactFlowBounds.left;
        const mouseY = event.clientY - reactFlowBounds.top;
  
        // Get the transform (viewport pan and zoom) from React Flow instance
        const { x: viewportX, y: viewportY, zoom } = reactFlowInstance.getViewport();
  
        // Adjust the mouse position to account for the pan and zoom
        const position = {
          x: (mouseX - viewportX) / zoom,
          y: (mouseY - viewportY) / zoom,
        };
		const newNode = {
			id: getId(),
			type,
			position,
			data: { label: `${type} node` },
		}

		setNodes(newNode)
	}
}
