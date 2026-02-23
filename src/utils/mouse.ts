import { useEffect, useState } from "react";

interface MousePosition {
	x: number;
	y: number;
}

export function useMousePosition(): MousePosition {
	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		let rafId: number;
		let lastUpdate = 0;
		
		const handleMouseMove = (event: MouseEvent) => {
			const now = performance.now();
			// Throttle to ~60fps max
			if (now - lastUpdate < 16) return;
			lastUpdate = now;
			
			if (rafId) cancelAnimationFrame(rafId);
			rafId = requestAnimationFrame(() => {
				setMousePosition({ x: event.clientX, y: event.clientY });
			});
		};

		window.addEventListener("mousemove", handleMouseMove, { passive: true });

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			if (rafId) cancelAnimationFrame(rafId);
		};
	}, []);

	return mousePosition;
}