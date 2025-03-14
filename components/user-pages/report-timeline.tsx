import { Dispute } from "@/app/types/dispute";

export default function ReportTimeline({ report }: { report: Dispute }) {
  const waitingIcon = report.status == "waiting" ? "●" : "";
  const consideringIcon = report.status == "considering" ? "●" : "";
  const completeIcon = report.status == "complete" ? "●" : "";

  const consideringStep =
    report.status == "considering" || report.status == "waiting"
      ? "step-base"
      : "";
  const completeStep = report.status == "complete" ? "" : "step-base";
  return (
    <ul className="steps w-full">
      <li data-content={waitingIcon} className={`step `}>
        waiting
      </li>
      <li data-content={consideringIcon} className={`step ${consideringStep}`}>
        considering
      </li>
      <li data-content={completeIcon} className={`step ${completeStep}`}>
        complete
      </li>
    </ul>
  );
}
