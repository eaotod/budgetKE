import { getAdminEmails } from "@/lib/auth/admin";

export default async function SettingsPage() {
  const admins = getAdminEmails();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Settings
        </h1>
        <p className="text-gray-500">
          Admin access and security overview for the control panel.
        </p>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-4">
        <h2 className="text-lg font-black text-gray-900">Admin Users</h2>
        <p className="text-sm text-gray-500">
          Only emails listed here can access admin features.
        </p>
        <div className="space-y-2">
          {admins.length === 0 ? (
            <div className="text-sm text-gray-400">
              No admin emails found. Add one via `ADMIN_EMAIL` and re-seed.
            </div>
          ) : (
            admins.map((admin) => (
              <div
                key={admin}
                className="px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-sm font-bold text-gray-700"
              >
                {admin}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-4">
        <h2 className="text-lg font-black text-gray-900">Storage Security</h2>
        <p className="text-sm text-gray-500">
          Public access is limited to product images. Download files are served
          via signed URLs from the download endpoint.
        </p>
        <div className="text-xs text-gray-400">
          Tip: enable hotlink protection in your CDN for stricter domain-only
          access to public images.
        </div>
      </div>
    </div>
  );
}
