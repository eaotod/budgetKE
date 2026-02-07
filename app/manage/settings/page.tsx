export default async function SettingsPage() {
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
          Admin access is determined by the signed-in user&apos;s Supabase auth
          metadata role.
        </p>
        <div className="text-sm text-gray-400">
          To grant access to the portal, set <span className="font-mono">role</span>{" "}
          to <span className="font-mono">admin</span> in the user&apos;s{" "}
          <span className="font-mono">user_metadata</span>.
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
