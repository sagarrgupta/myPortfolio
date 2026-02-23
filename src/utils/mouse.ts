import { useEffect, useRef } from "react";

interface MousePosition {
	x: number;
	y: number;
}

/**
 * High-performance mouse position hook.
 * Returns a stable ref object that is mutated in place — zero React re-renders.
 * Consumers should read from the object inside an animation loop.
 */
export function useMousePosition(): MousePosition {
	const pos = useRef<MousePosition>({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			pos.current.x = event.clientX;
			pos.current.y = event.clientY;
		};

		window.addEventListener("mousemove", handleMouseMove, { passive: true });
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return pos.current;
}