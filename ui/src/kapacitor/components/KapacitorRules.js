import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import NoKapacitorError from '../../shared/components/NoKapacitorError';
import KapacitorRulesTable from 'src/kapacitor/components/KapacitorRulesTable'

const KapacitorRules = ({
  source,
  rules,
  hasKapacitor,
  loading,
  onDelete,
  onChangeRuleStatus,
}) => {
  if (!hasKapacitor) {
    return (
      <PageContents>
        <NoKapacitorError source={source} />
      </PageContents>
    )
  }

  if (loading) {
    return (
      <PageContents>
        <h2>Loading...</h2>
      </PageContents>
    )
  }

  return (
    <PageContents>
      <div className="panel-heading u-flex u-ai-center u-jc-space-between">
        <h2 className="panel-title">Alert Rules</h2>
        <Link to={`/sources/${source.id}/alert-rules/new`} className="btn btn-sm btn-primary">Create New Rule</Link>
      </div>
      <KapacitorRulesTable
        source={source}
        rules={rules}
        onDelete={onDelete}
        onChangeRuleStatus={onChangeRuleStatus}
      />
    </PageContents>
  )
}

const PageContents = ({children}) => (
  <div className="page">
    <div className="page-header">
      <div className="page-header__container">
        <div className="page-header__left">
          <h1>Kapacitor Rules</h1>
        </div>
      </div>
    </div>
    <div className="page-contents">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-minimal">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const {
  arrayOf,
  bool,
  func,
  shape,
  node,
} = PropTypes

KapacitorRules.propTypes = {
  source: shape(),
  rules: arrayOf(shape()),
  hasKapacitor: bool,
  loading: bool,
  onChangeRuleStatus: func,
  onDelete: func,
}

PageContents.propTypes = {
  children: node,
}

export default KapacitorRules
