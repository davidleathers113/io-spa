

import { useEffect, useRef, useState } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import type { IoPayload } from '../features/io/schema';

type SignaturePadProps = {
  name: 'sig_buyer_data' | 'sig_seller_data';
  label: string;
  register: UseFormRegister<IoPayload>;
  height?: number;
};

// Lightweight canvas-based signature pad without external deps.
const SignaturePad: React.FC<SignaturePadProps> = ({ name, label, register, height = 160 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.scale(dpr, dpr);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 2.2;
    context.strokeStyle = '#0f172a'; // slate-900
    setCtx(context);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      const t = e.touches[0];
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }
    const m = e as React.MouseEvent;
    return { x: m.clientX - rect.left, y: m.clientY - rect.top };
  };

  const start = (e: React.MouseEvent | React.TouchEvent) => {
    if (!ctx) return;
    setIsDrawing(true);
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const move = (e: React.MouseEvent | React.TouchEvent) => {
    if (!ctx || !isDrawing) return;
    e.preventDefault();
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const end = () => {
    if (!ctx) return;
    setIsDrawing(false);
    // write dataURL into hidden input and dispatch input event for RHF
    const dataUrl = canvasRef.current?.toDataURL('image/png') ?? '';
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = dataUrl;
      hiddenInputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = '';
      hiddenInputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div
        className="relative border rounded-md bg-white shadow-inner"
        style={{ height }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full rounded-md touch-none"
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={end}
          onMouseLeave={end}
          onTouchStart={start}
          onTouchMove={move}
          onTouchEnd={end}
        />
        <button type="button" onClick={handleClear} className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-100 border border-gray-300 rounded hover:bg-gray-200">
          Clear
        </button>
      </div>
      {/* Hidden input bound to RHF */}
      <input type="hidden" {...register(name as any)} ref={(el) => { hiddenInputRef.current = el as HTMLInputElement | null; }} />
    </div>
  );
};

export default SignaturePad;
