export default function TextArea() {
  return (
    <div>
      <label
        htmlFor="about"
        className="block text-sm font-medium text-gray-700"
      >
        About
      </label>
      <div className="mt-1">
        <textarea
          id="about"
          name="about"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="you@example.com"
          defaultValue={""}
        />
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Brief description for your profile. URLs are hyperlinked.
      </p>
    </div>
  );
}
