import {
  Squares2X2Icon,
  RocketLaunchIcon,
  UsersIcon,
  Cog8ToothIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

import { NotSubscribed, Subscribed } from '@/components/SubscriptionStatus';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  return (
    <div className="shrink-0">
      <div className="lg:sticky lg:top-4 flex flex-wrap gap-2 lg:flex-col lg:pr-4">
        <SidebarItem icon={<Squares2X2Icon />} href="/dashboard" label="Dashboard" />
        <SidebarItem icon={<RocketLaunchIcon />} href="/dashboard/examples" label="Pro Examples" matchSubPaths />
        <SidebarItem icon={<ChatBubbleLeftRightIcon />} href="/dashboard/support" label="Support" />
        <Subscribed requireAdminSubscription>
          <SidebarItem icon={<UsersIcon />} href="/dashboard/team" label="Team" />
        </Subscribed>
        <SidebarItem icon={<Cog8ToothIcon />} href="/dashboard/account" label="Account" />
        <NotSubscribed>
          <SidebarItem
            icon={<SparklesIcon />}
            href="/dashboard/subscribe"
            label="Subscribe"
            className="!text-react hover:!bg-pink-100"
          />
        </NotSubscribed>
      </div>
    </div>
  );
};

export default Sidebar;
