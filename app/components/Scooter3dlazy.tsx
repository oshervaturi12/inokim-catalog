"use client";

import dynamic from "next/dynamic";

/**
 * Lazy-loads the heavy Scooter3D component (three.js + react-three-fiber).
 * Pages that don't use this won't pay the ~150KB bundle cost.
 *
 * Usage:
 *   <Scooter3DLazy modelSrc="/models/oxo-dubai.glb" />
 */
const Scooter3DLazy = dynamic(() => import("./Scooter3d"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="size-8 animate-spin rounded-sm border-2 border-white/20 border-t-white/80" />
    </div>
  ),
});

export default Scooter3DLazy;