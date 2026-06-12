export const CONSULTATION_MODAL_EVENT = "kaizen-open-consultation-modal";

export function openConsultationModal() {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new Event(CONSULTATION_MODAL_EVENT));
}
