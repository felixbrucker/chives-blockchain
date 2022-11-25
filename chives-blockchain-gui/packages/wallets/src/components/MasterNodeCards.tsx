import React, { ReactElement } from 'react';
import { Grid } from '@mui/material';
import { useGetMasterNodeSummaryQuery } from '@chives/api-react';
import { Trans } from '@lingui/macro';
import { CardSimple, Flex, TooltipIcon } from '@chives/core';
import styled from 'styled-components';
import WalletGraph from './WalletGraph';

export type MasterNodeCardsProps = {
  walletId: number;
  totalBalanceTooltip?: ReactElement<any>;
  spendableBalanceTooltip?: ReactElement<any>;
  pendingTotalBalanceTooltip?: ReactElement<any>;
  pendingBalanceTooltip?: ReactElement<any>;
  pendingChangeTooltip?: ReactElement<any>;
};

const StyledGraphContainer = styled.div`
  margin-left: -1rem;
  margin-right: -1rem;
  margin-top: 1rem;
  margin-bottom: -1rem;
  position: relative;
`;

export default function MasterNodeCards(props: MasterNodeCardsProps) {
  const {
    walletId,
    totalBalanceTooltip,
    spendableBalanceTooltip,
    pendingTotalBalanceTooltip,
    pendingBalanceTooltip,
    pendingChangeTooltip,
  } = props;

  const { 
    data: MasterNodeSummary
  } = useGetMasterNodeSummaryQuery({
    walletId,
  }, {
    pollingInterval: 10000,
  });

  console.log("==============")
  console.log(MasterNodeSummary)
  const error = null;
  const isLoading = false;
  const MasterNodeStakingAmount = MasterNodeSummary?.MasterNodeStakingAmount;
  const MasterNodeCount = MasterNodeSummary?.MasterNodeCount;
  const MasterNodeOnlineCount = MasterNodeSummary?.MasterNodeOnlineCount;
  const MasterNodeRewardHaveSentAmount = MasterNodeSummary?.MasterNodeRewardHaveSentAmount;
  const MasterNodeRewardPoolAmount = MasterNodeSummary?.MasterNodeRewardPoolAmount;

  return (
    <div>
      <Grid spacing={2} alignItems="stretch" container>
        <Grid xs={12} lg={4} item>
          <CardSimple
          loading={isLoading}
          title={<Trans>Staking Amount</Trans>}
          tooltip={totalBalanceTooltip}
          value={MasterNodeStakingAmount}
          error={error}
        >
          <Flex flexGrow={1} />
          <StyledGraphContainer>
            <WalletGraph walletId={walletId} height={80} />
          </StyledGraphContainer>
        </CardSimple>
        </Grid>
        <Grid xs={12} lg={8} item>
          <Grid spacing={2} alignItems="stretch" container>
            <Grid xs={12} md={6} item>
              <CardSimple
                loading={isLoading}
                valueColor="secondary"
                title={<Trans>Total Nodes</Trans>}
                tooltip={spendableBalanceTooltip}
                value={MasterNodeCount}
                error={error}
              />
            </Grid>
            <Grid xs={12} md={6} item>
              <CardSimple
                loading={isLoading}
                valueColor="secondary"
                title={<Trans>Online Nodes</Trans>}
                tooltip={pendingTotalBalanceTooltip}
                value={MasterNodeOnlineCount}
                error={error}
              />
            </Grid>
            <Grid xs={12} md={6} item>
              <CardSimple
                loading={isLoading}
                valueColor="secondary"
                title={<Trans>Have Sent Amount</Trans>}
                tooltip={pendingBalanceTooltip}
                value={MasterNodeRewardHaveSentAmount}
                error={error}
              />
            </Grid>
            <Grid xs={12} md={6} item>
              <CardSimple
                loading={isLoading}
                valueColor="secondary"
                title={<Trans>Reward Pool Amount</Trans>}
                tooltip={pendingChangeTooltip}
                value={MasterNodeRewardPoolAmount}
                error={error}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

MasterNodeCards.defaultProps = {
  totalBalanceTooltip: undefined,
  spendableBalanceTooltip: undefined,
  pendingTotalBalanceTooltip: undefined,
  pendingBalanceTooltip: undefined,
  pendingChangeTooltip: undefined,
};
