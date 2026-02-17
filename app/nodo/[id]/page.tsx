"use client";

import { notFound } from "next/navigation";
import { NodeDetail } from "../../components/NodeDetail";
import { getNodeById } from "../../data/nodes";

export default function NodoPage({
  params,
}: {
  params: { id: string };
}) {
  const node = getNodeById(params.id);

  if (!node) {
    notFound();
  }

  return <NodeDetail {...node} />;
}

