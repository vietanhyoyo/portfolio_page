import { Settings } from "lucide-react";

export default function SettingButton() {
  return (
    <div
      className="fixed bottom-10 right-10 bg-primary p-3"
      style={{ borderRadius: "99px", borderBottomRightRadius: "30px" }}
    >
      <Settings className="animate-spin-slow" width={34} height={34} />
    </div>
  );
}
