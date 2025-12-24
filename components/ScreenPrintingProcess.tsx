'use client';

import { useState } from 'react';

type PrintStep = 'setup' | 'mesh' | 'stencil' | 'ink' | 'squeegee' | 'complete';

const ScreenPrintingProcess = () => {
    const [currentStep, setCurrentStep] = useState<PrintStep>('setup');
    const [inkColor, setInkColor] = useState('#4f4fc5'); // studio-500
    const [isAnimating, setIsAnimating] = useState(false);
    const [showMesh, setShowMesh] = useState(true);
    const [showStencil, setShowStencil] = useState(true);
    const [showInk, setShowInk] = useState(false);

    const steps: { id: PrintStep; label: string; description: string }[] = [
        { id: 'setup', label: 'Setup', description: 'Prepare the screen printing station' },
        { id: 'mesh', label: 'Mesh Screen', description: 'Position the mesh screen over substrate' },
        { id: 'stencil', label: 'Stencil', description: 'Apply stencil to block ink in specific areas' },
        { id: 'ink', label: 'Ink Application', description: 'Apply ink to the screen' },
        { id: 'squeegee', label: 'Squeegee Pull', description: 'Pull squeegee across screen to transfer ink' },
        { id: 'complete', label: 'Complete', description: 'Print complete - lift screen to reveal' },
    ];

    const handleStepChange = (step: PrintStep) => {
        setCurrentStep(step);

        // Update layer visibility based on step
        switch (step) {
            case 'setup':
                setShowMesh(false);
                setShowStencil(false);
                setShowInk(false);
                break;
            case 'mesh':
                setShowMesh(true);
                setShowStencil(false);
                setShowInk(false);
                break;
            case 'stencil':
                setShowMesh(true);
                setShowStencil(true);
                setShowInk(false);
                break;
            case 'ink':
                setShowMesh(true);
                setShowStencil(true);
                setShowInk(true);
                break;
            case 'squeegee':
                setShowMesh(true);
                setShowStencil(true);
                setShowInk(true);
                triggerSqueegee();
                break;
            case 'complete':
                setShowMesh(false);
                setShowStencil(false);
                setShowInk(true);
                break;
        }
    };

    const triggerSqueegee = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
            setCurrentStep('complete');
        }, 2000);
    };

    const inkColors = [
        { name: 'Studio Purple', value: '#4f4fc5' },
        { name: 'Cyan', value: '#00b4d8' },
        { name: 'Magenta', value: '#e63946' },
        { name: 'Yellow', value: '#ffd60a' },
        { name: 'Black', value: '#1c1c54' },
    ];

    return (
        <section className="relative w-full bg-studio-50 py-24 md:py-32">
            <div className="mx-auto max-w-content px-4">

                {/* Main Grid Layout */}
                <div className="grid gap-8 lg:grid-cols-12">
                    {/* Print Area - 8 columns */}
                    <div className="lg:col-span-8">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-studio-900/10 bg-white shadow-2xl">
                            {/* Substrate Base */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />

                            {/* Mesh Screen Layer */}
                            {showMesh && (
                                <div className="absolute inset-0 transition-opacity duration-500">
                                    <svg className="h-full w-full">
                                        <defs>
                                            <pattern
                                                id="mesh-pattern"
                                                x="0"
                                                y="0"
                                                width="16"
                                                height="16"
                                                patternUnits="userSpaceOnUse"
                                            >
                                                <circle cx="8" cy="8" r="0.8" fill="#1c1c54" opacity="0.15" />
                                                <line
                                                    x1="0"
                                                    y1="8"
                                                    x2="16"
                                                    y2="8"
                                                    stroke="#1c1c54"
                                                    strokeWidth="0.3"
                                                    opacity="0.1"
                                                />
                                                <line
                                                    x1="8"
                                                    y1="0"
                                                    x2="8"
                                                    y2="16"
                                                    stroke="#1c1c54"
                                                    strokeWidth="0.3"
                                                    opacity="0.1"
                                                />
                                            </pattern>
                                        </defs>
                                        <rect width="100%" height="100%" fill="url(#mesh-pattern)" />
                                    </svg>
                                    {/* Mesh Frame */}
                                    <div className="absolute inset-0 border-8 border-studio-800/20" />
                                </div>
                            )}

                            {/* Stencil Layer */}
                            {showStencil && (
                                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500">
                                    <svg
                                        viewBox="0 0 400 300"
                                        className="h-full w-full"
                                        style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
                                    >
                                        <defs>
                                            <mask id="stencil-mask">
                                                <rect width="400" height="300" fill="white" />
                                                <text
                                                    x="200"
                                                    y="150"
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    fontSize="48"
                                                    fontWeight="900"
                                                    fill="black"
                                                >
                                                    SIMULASI
                                                </text>
                                            </mask>
                                        </defs>
                                        {/* Stencil blocking areas */}
                                        <rect width="400" height="300" fill="rgba(28, 28, 84, 0.3)" mask="url(#stencil-mask)" />
                                    </svg>
                                </div>
                            )}

                            {/* Ink Layer */}
                            {showInk && (
                                <div
                                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
                                    style={{
                                        clipPath: isAnimating
                                            ? 'inset(0 0 0 0)'
                                            : currentStep === 'complete'
                                                ? 'inset(0 0 0 0)'
                                                : 'inset(0 100% 0 0)',
                                        transition: 'clip-path 2s ease-in-out',
                                    }}
                                >
                                    <svg viewBox="0 0 400 300" className="h-full w-full">
                                        <text
                                            x="200"
                                            y="150"
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fontSize="48"
                                            fontWeight="900"
                                            fill={inkColor}
                                        >
                                            SIMULASI
                                        </text>
                                    </svg>
                                </div>
                            )}

                            {/* Squeegee */}
                            {isAnimating && (
                                <div
                                    className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-studio-800/40 to-transparent"
                                    style={{
                                        animation: 'squeegee-pull 2s ease-in-out',
                                        left: '-4rem',
                                    }}
                                >
                                    <div className="absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 bg-studio-900" />
                                </div>
                            )}

                            {/* Step Indicator Overlay */}
                            <div className="absolute bottom-4 left-4 rounded-lg bg-studio-900/80 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
                                {steps.find((s) => s.id === currentStep)?.label}
                            </div>
                        </div>
                    </div>

                    {/* Controls Panel - 4 columns */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-6">
                            {/* Step Controls */}
                            <div className="rounded-xl border border-studio-900/10 bg-white p-6 shadow-lg">
                                <h3 className="mb-4 text-lg font-bold text-studio-950">Process Steps</h3>
                                <div className="space-y-2">
                                    {steps.map((step, index) => (
                                        <button
                                            key={step.id}
                                            onClick={() => handleStepChange(step.id)}
                                            disabled={isAnimating}
                                            className={`w-full rounded-lg border-2 p-3 text-left transition-all disabled:opacity-50 ${currentStep === step.id
                                                ? 'border-studio-500 bg-studio-50 shadow-md'
                                                : 'border-studio-900/10 bg-white hover:border-studio-300 hover:bg-studio-50/50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${currentStep === step.id
                                                        ? 'bg-studio-500 text-white'
                                                        : 'bg-studio-100 text-studio-700'
                                                        }`}
                                                >
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-bold text-studio-950">{step.label}</div>
                                                    <div className="text-xs text-studio-600">{step.description}</div>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Layer Toggles */}
                            <div className="rounded-xl border border-studio-900/10 bg-white p-6 shadow-lg">
                                <h3 className="mb-4 text-lg font-bold text-studio-950">Layer Controls</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={showMesh}
                                            onChange={(e) => setShowMesh(e.target.checked)}
                                            className="h-5 w-5 rounded border-studio-300 text-studio-500 focus:ring-studio-500"
                                        />
                                        <span className="text-sm font-medium text-studio-900">Mesh Screen</span>
                                    </label>
                                    <label className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={showStencil}
                                            onChange={(e) => setShowStencil(e.target.checked)}
                                            className="h-5 w-5 rounded border-studio-300 text-studio-500 focus:ring-studio-500"
                                        />
                                        <span className="text-sm font-medium text-studio-900">Stencil</span>
                                    </label>
                                    <label className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={showInk}
                                            onChange={(e) => setShowInk(e.target.checked)}
                                            className="h-5 w-5 rounded border-studio-300 text-studio-500 focus:ring-studio-500"
                                        />
                                        <span className="text-sm font-medium text-studio-900">Ink Layer</span>
                                    </label>
                                </div>
                            </div>

                            {/* Ink Color Picker */}
                            <div className="rounded-xl border border-studio-900/10 bg-white p-6 shadow-lg">
                                <h3 className="mb-4 text-lg font-bold text-studio-950">Ink Color</h3>
                                <div className="grid grid-cols-5 gap-2">
                                    {inkColors.map((color) => (
                                        <button
                                            key={color.value}
                                            onClick={() => setInkColor(color.value)}
                                            className={`aspect-square rounded-lg border-2 transition-all hover:scale-110 ${inkColor === color.value
                                                ? 'border-studio-900 shadow-lg'
                                                : 'border-studio-900/10'
                                                }`}
                                            style={{ backgroundColor: color.value }}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Reset Button */}
                            <button
                                onClick={() => handleStepChange('setup')}
                                disabled={isAnimating}
                                className="w-full rounded-lg border-2 border-studio-900/10 bg-white px-6 py-3 font-bold text-studio-900 transition-all hover:border-studio-500 hover:bg-studio-50 disabled:opacity-50"
                            >
                                Reset Process
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS Animation Styles */}
            <style jsx>{`
                @keyframes squeegee-pull {
                    0% {
                        left: -4rem;
                    }
                    100% {
                        left: 100%;
                    }
                }
            `}</style>
        </section>
    );
};

export default ScreenPrintingProcess;
