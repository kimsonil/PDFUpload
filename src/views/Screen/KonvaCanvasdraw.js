/** @format */

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Stage, Layer, Rect } from "react-konva";

const KonvaCanvasdraw = (props) => {
	const [annotations, setAnnotations] = useState([]);
	const [newAnnotation, setNewAnnotation] = useState([]);
	const handleMouseDown = (event) => {
		if (props.selectTool === "square_draw") {
			if (newAnnotation.length === 0) {
				const { x, y } = event.target.getStage().getPointerPosition();
				setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
			}
		}
	};

	const handleMouseUp = (event) => {
		if (props.selectTool === "square_draw") {
			if (newAnnotation.length === 1) {
				const sx = newAnnotation[0].x;
				const sy = newAnnotation[0].y;
				const { x, y } = event.target.getStage().getPointerPosition();
				const annotationToAdd = {
					x: Math.floor(sx),
					y: Math.floor(sy),
					width: Math.floor(x - sx),
					height: Math.floor(y - sy),
					key: annotations.length + 1,
				};
				props.setTransform({
					x: Math.floor(x),
					y: Math.floor(y),
					width: Math.floor(x - sx),
					height: Math.floor(y - sy),
				});
				localStorage.setItem(
					"transformItem",
					JSON.stringify({
						x: Math.floor(x),
						y: Math.floor(y),
						width: Math.floor(x - sx),
						height: Math.floor(y - sy),
					}),
				);
				// annotations.push(annotationToAdd);
				setNewAnnotation([]);
				setAnnotations([annotationToAdd]);
			}
		}
	};

	const handleMouseMove = (event) => {
		if (props.selectTool === "square_draw") {
			if (newAnnotation.length === 1) {
				const sx = newAnnotation[0].x;
				const sy = newAnnotation[0].y;
				const { x, y } = event.target.getStage().getPointerPosition();
				setNewAnnotation([
					{
						x: sx,
						y: sy,
						width: x - sx,
						height: y - sy,
						key: "0",
					},
				]);
			}
		}
	};

	const annotationsToDraw = [...annotations, ...newAnnotation];
	return (
		<div style={{ position: "absolute", zIndex: 100 }}>
			<Stage
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
				width={1050}
				height={850}
			>
				<Layer>
					{annotationsToDraw.map((value) => {
						return (
							<Rect
								x={value.x}
								y={value.y}
								width={value.width}
								height={value.height}
								fill="rgba(11, 206, 165, 0.1)"
								stroke="#0BCEA5"
							/>
						);
					})}
				</Layer>
			</Stage>
		</div>
	);
};

export default KonvaCanvasdraw;
