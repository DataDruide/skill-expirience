
CREATE TABLE public.contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public contact form)
CREATE POLICY "Anyone can submit contact requests"
  ON public.contact_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated project owners can view requests related to their projects
CREATE POLICY "Project owners can view their contact requests"
  ON public.contact_requests
  FOR SELECT
  TO authenticated
  USING (
    project_id IS NULL 
    OR EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = contact_requests.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Project owners can update (mark as read)
CREATE POLICY "Project owners can update contact requests"
  ON public.contact_requests
  FOR UPDATE
  TO authenticated
  USING (
    project_id IS NULL 
    OR EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = contact_requests.project_id 
      AND projects.user_id = auth.uid()
    )
  );
