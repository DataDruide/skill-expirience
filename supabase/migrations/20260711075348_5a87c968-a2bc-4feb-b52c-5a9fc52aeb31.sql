
-- contact_requests: replace overly-permissive policies
DROP POLICY IF EXISTS "Project owners can view their contact requests" ON public.contact_requests;
DROP POLICY IF EXISTS "Project owners can update contact requests" ON public.contact_requests;
DROP POLICY IF EXISTS "Anyone can submit contact requests" ON public.contact_requests;

CREATE POLICY "Owner can view contact requests" ON public.contact_requests
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.projects p
      WHERE p.user_id = auth.uid()
        AND (contact_requests.project_id IS NULL OR p.id = contact_requests.project_id)
    )
  );

CREATE POLICY "Owner can update contact requests" ON public.contact_requests
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.projects p
      WHERE p.user_id = auth.uid()
        AND (contact_requests.project_id IS NULL OR p.id = contact_requests.project_id)
    )
  );

CREATE POLICY "Anyone can submit contact requests" ON public.contact_requests
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    is_read = false
    AND length(btrim(name)) BETWEEN 1 AND 200
    AND length(btrim(email)) BETWEEN 3 AND 320
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(btrim(message)) BETWEEN 1 AND 5000
    AND (company IS NULL OR length(company) <= 200)
  );

-- storage: restrict writes to the user's own folder; remove public listing
DROP POLICY IF EXISTS "Authenticated users can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete project images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view project images" ON storage.objects;

CREATE POLICY "Owner can upload project images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'project-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Owner can update project images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'project-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  )
  WITH CHECK (
    bucket_id = 'project-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Owner can delete project images" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'project-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
-- No SELECT policy on storage.objects for project-images: bucket remains public
-- so direct object URLs still resolve, but listing via the API is blocked.
