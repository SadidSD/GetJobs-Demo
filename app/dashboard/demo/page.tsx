"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import Card, { CardHeader, CardTitle, CardBody, CardFooter } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import FormField from "@/components/ui/FormField";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import SkillChip from "@/components/ui/SkillChip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { SkeletonCard, SkeletonJobCard } from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/ToastProvider";

export default function DemoPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100 pb-20 lg:pb-0">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold">Component Demo</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl space-y-8 p-4 sm:p-6">
        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="sm">Primary Small</Button>
              <Button variant="primary" size="md">Primary Medium</Button>
              <Button variant="primary" size="lg">Primary Large</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button isLoading={loading} onClick={handleLoading}>
                Loading State
              </Button>
              <Button fullWidth className="sm:w-auto">Full Width</Button>
            </div>
          </CardBody>
        </Card>

        {/* Form Fields */}
        <Card>
          <CardHeader>
            <CardTitle>Form Fields with Validation</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <FormField
              label="Email"
              type="email"
              placeholder="you@example.com"
              rules={[
                {
                  test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
                  message: "Invalid email format",
                },
              ]}
              validateOnChange
              required
            />
            <FormField
              label="Password"
              type="password"
              placeholder="••••••••"
              rules={[
                {
                  test: (v) => v.length >= 8,
                  message: "Must be at least 8 characters",
                },
              ]}
              validateOnBlur
              required
            />
            <Input label="Simple Input" placeholder="No validation" />
          </CardBody>
        </Card>

        {/* Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Tabs Component</CardTitle>
          </CardHeader>
          <CardBody>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <div className="mt-4">
                <TabsContent value="tab1">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Content for Tab 1</p>
                </TabsContent>
                <TabsContent value="tab2">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Content for Tab 2</p>
                </TabsContent>
                <TabsContent value="tab3">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Content for Tab 3</p>
                </TabsContent>
              </div>
            </Tabs>
          </CardBody>
        </Card>

        {/* Badges & Chips */}
        <Card>
          <CardHeader>
            <CardTitle>Badges & Skill Chips</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="neutral">Neutral</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <SkillChip label="React" selected />
              <SkillChip label="TypeScript" />
              <SkillChip label="Node.js" onRemove={() => addToast({ title: "Removed", description: "Skill removed" })} />
            </div>
          </CardBody>
        </Card>

        {/* Modal */}
        <Card>
          <CardHeader>
            <CardTitle>Modal Dialog</CardTitle>
          </CardHeader>
          <CardBody>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            <Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Example Modal"
              footer={
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
                  <Button onClick={() => {
                    setModalOpen(false);
                    addToast({ title: "Saved", description: "Changes saved successfully", variant: "success" });
                  }}>Save</Button>
                </div>
              }
            >
              <p className="text-sm text-zinc-600 dark:text-zinc-400">This is a modal with animations!</p>
            </Modal>
          </CardBody>
        </Card>

        {/* Loading Skeletons */}
        <Card>
          <CardHeader>
            <CardTitle>Loading Skeletons</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <SkeletonCard />
            <SkeletonJobCard />
          </CardBody>
        </Card>

        {/* Toast Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Toast Notifications</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => addToast({ title: "Default", description: "This is a default toast" })}
              >
                Default Toast
              </Button>
              <Button
                variant="outline"
                onClick={() => addToast({ title: "Success!", description: "Operation completed", variant: "success" })}
              >
                Success Toast
              </Button>
              <Button
                variant="outline"
                onClick={() => addToast({ title: "Warning", description: "Please check this", variant: "warning" })}
              >
                Warning Toast
              </Button>
              <Button
                variant="outline"
                onClick={() => addToast({ title: "Error", description: "Something went wrong", variant: "error" })}
              >
                Error Toast
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

