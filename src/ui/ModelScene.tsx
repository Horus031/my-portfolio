"use client";

import FloatingCore from "@/ui/FloatingCore";

type SceneModel = {
  id: string;
  modelPath: string;
  cameraAnim: {
    zoomIn: number;
  };
  visible: boolean;
};

interface ModelSceneProps {
  models: SceneModel[];
}

export default function ModelScene({ models }: ModelSceneProps) {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {models.map((model) =>
        model.visible ? (
          <FloatingCore
            key={model.id}
            modelPath={model.modelPath}
            cameraAnim={model.cameraAnim}
            className="absolute inset-0"
          />
        ) : null,
      )}
    </div>
  );
}
